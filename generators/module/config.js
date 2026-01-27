const path = require("path");
const fs = require("fs");

module.exports = function (plop) {
  plop.setGenerator("module", {
    description: "Generate a complete module for the application",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Module name (ex: users, orders):",
        validate: (value) => {
          if (!value) return "Module name is required";

          if (!/^[a-zA-Z][a-zA-Z0-9\s-]*$/.test(value)) {
            return "Module name must start with a letter and contain only letters, numbers, spaces, and hyphens";
          }

          return true;
        },
        filter: (value) => value.trim(),
      },
      {
        type: "confirm",
        name: "withDetailsPage",
        message: "Include details page?",
        default: true,
      },
    ],

    actions: (data) => {
      // Sanitize module name
      const sanitizedName = data.name
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^a-zA-Z0-9-]/g, "")
        .toLowerCase();

      // Use process.cwd() to ensure we write to the project root
      const basePath = path.join(process.cwd(), "src/modules", sanitizedName);

      // Security check
      if (basePath.includes("node_modules")) {
        throw new Error(
          "Security check failed: Cannot write to node_modules directory",
        );
      }

      // Ensure the base directory exists
      fs.mkdirSync(basePath, { recursive: true });

      const actions = [];

      // Helper to add component actions
      const addComponent = (componentName, templateName) => {
        const componentDir = path.join(
          "components",
          `${sanitizedName}-${componentName}`,
        );

        // Ensure component directory exists
        fs.mkdirSync(path.join(basePath, componentDir), { recursive: true });

        actions.push(
          {
            type: "add",
            path: path.join(
              basePath,
              componentDir,
              `${sanitizedName}-${componentName}.tsx`,
            ),
            templateFile: path.join(
              __dirname,
              `templates/components/module-${templateName}/component.hbs`,
            ),
          },
          {
            type: "add",
            path: path.join(basePath, componentDir, "index.ts"),
            templateFile: path.join(
              __dirname,
              `templates/components/module-${templateName}/index.hbs`,
            ),
          },
        );
      };

      // Add all components
      addComponent("form", "form");
      addComponent("form-dialog", "form-dialog");
      addComponent("list-toolbar", "list-toolbar");
      addComponent("list-row-actions", "list-row-actions");

      // Constants files
      const constantsFiles = [
        {
          filename: `${sanitizedName}-list.columns.tsx`,
          template: "module-list.columns",
        },
        { filename: `${sanitizedName}.paths.ts`, template: "module.paths" },
        {
          filename: `${sanitizedName}.permissions.ts`,
          template: "module.permissions",
        },
        { filename: `${sanitizedName}.queries.ts`, template: "module.queries" },
      ];

      constantsFiles.forEach(({ filename, template }) => {
        const constantsDir = path.join(basePath, "constants");
        fs.mkdirSync(constantsDir, { recursive: true });

        actions.push({
          type: "add",
          path: path.join(constantsDir, filename),
          templateFile: path.join(
            __dirname,
            `templates/constants/${template}.hbs`,
          ),
        });
      });

      // Pages
      const pagesDir = path.join(basePath, "pages");
      fs.mkdirSync(pagesDir, { recursive: true });

      actions.push(
        {
          type: "add",
          path: path.join(pagesDir, `${sanitizedName}-list.page.tsx`),
          templateFile: path.join(
            __dirname,
            "templates/pages/module-list.page.hbs",
          ),
        },
        {
          type: "add",
          path: path.join(pagesDir, "index.ts"),
          templateFile: path.join(__dirname, "templates/pages/index.hbs"),
        },
      );

      if (data.withDetailsPage) {
        actions.push({
          type: "add",
          path: path.join(pagesDir, `${sanitizedName}-details.page.tsx`),
          templateFile: path.join(
            __dirname,
            "templates/pages/module-details.page.hbs",
          ),
        });
      }

      // Module barrel export
      actions.push({
        type: "add",
        path: path.join(basePath, "index.ts"),
        templateFile: path.join(__dirname, "templates/module-index.hbs"),
        data: { sanitizedName },
      });

      return actions;
    },
  });
};
