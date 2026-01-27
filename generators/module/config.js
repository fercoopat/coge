// generators/module/config.js
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
      const sanitizedName = data.name
        .replace(/\s+/g, "-")
        .replace(/[^a-zA-Z0-9-]/g, "")
        .toLowerCase();

      // CRITICAL FIX: Use process.cwd() to target the consumer project
      const basePath = path.join(process.cwd(), "src/modules", sanitizedName);

      // Verify we're not writing to node_modules
      if (basePath.includes("node_modules")) {
        throw new Error(
          "Security check failed: Cannot write to node_modules directory",
        );
      }

      // Ensure the base directory exists
      if (!fs.existsSync(basePath)) {
        fs.mkdirSync(basePath, { recursive: true });
      }

      const actions = [];

      // Helper function to add component actions
      const addComponent = (componentName, templateName) => {
        const componentDir = path.join(
          "components",
          `${sanitizedName}-${componentName}`,
        );
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
        actions.push({
          type: "add",
          path: path.join(basePath, "constants", filename),
          templateFile: path.join(
            __dirname,
            `templates/constants/${template}.hbs`,
          ),
        });
      });

      // Pages
      actions.push(
        {
          type: "add",
          path: path.join(basePath, "pages", `${sanitizedName}-list.page.tsx`),
          templateFile: path.join(
            __dirname,
            "templates/pages/module-list.page.hbs",
          ),
        },
        {
          type: "add",
          path: path.join(basePath, "pages", "index.ts"),
          templateFile: path.join(__dirname, "templates/pages/index.hbs"),
        },
      );

      if (data.withDetailsPage) {
        actions.push({
          type: "add",
          path: path.join(
            basePath,
            "pages",
            `${sanitizedName}-details.page.tsx`,
          ),
          templateFile: path.join(
            __dirname,
            "templates/pages/module-details.page.hbs",
          ),
        });
      }

      // Add barrel export file for the module
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
