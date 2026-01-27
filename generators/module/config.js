const path = require("path");

module.exports = function (plop) {
  plop.setGenerator("module", {
    description: "Generate a complete module for the application",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Module name (ex: users, orders)",
        validate: (value) => (value ? true : "Module name is required"),
      },
      {
        type: "confirm",
        name: "withDetailsPage",
        message: "Include details page?",
        default: true,
      },
    ],

    actions: (data) => {
      const sanitizedName = data.name.replace(/\s+/g, "-").toLowerCase();
      const basePath = path.join(
        plop.getDestBasePath(),
        "src/modules",
        sanitizedName,
      );

      const components = [
        {
          type: "add",
          path: path.join(
            basePath,
            "components",
            `${sanitizedName}-form`,
            `${sanitizedName}-form.tsx`,
          ),
          templateFile: path.join(
            __dirname,
            "templates/components/module-form/component.hbs",
          ),
        },
        {
          type: "add",
          path: path.join(
            basePath,
            "components",
            `${sanitizedName}-form`,
            "index.ts",
          ),
          templateFile: path.join(
            __dirname,
            "templates/components/module-form/index.hbs",
          ),
        },
        {
          type: "add",
          path: path.join(
            basePath,
            "components",
            `${sanitizedName}-form-dialog`,
            `${sanitizedName}-form-dialog.tsx`,
          ),
          templateFile: path.join(
            __dirname,
            "templates/components/module-form-dialog/component.hbs",
          ),
        },
        {
          type: "add",
          path: path.join(
            basePath,
            "components",
            `${sanitizedName}-form-dialog`,
            "index.ts",
          ),
          templateFile: path.join(
            __dirname,
            "templates/components/module-form-dialog/index.hbs",
          ),
        },
        {
          type: "add",
          path: path.join(
            basePath,
            "components",
            `${sanitizedName}-list-toolbar`,
            `${sanitizedName}-list-toolbar.tsx`,
          ),
          templateFile: path.join(
            __dirname,
            "templates/components/module-list-toolbar/component.hbs",
          ),
        },
        {
          type: "add",
          path: path.join(
            basePath,
            "components",
            `${sanitizedName}-list-toolbar`,
            "index.ts",
          ),
          templateFile: path.join(
            __dirname,
            "templates/components/module-list-toolbar/index.hbs",
          ),
        },
        {
          type: "add",
          path: path.join(
            basePath,
            "components",
            `${sanitizedName}-list-row-actions`,
            `${sanitizedName}-list-row-actions.tsx`,
          ),
          templateFile: path.join(
            __dirname,
            "templates/components/module-list-row-actions/component.hbs",
          ),
        },
        {
          type: "add",
          path: path.join(
            basePath,
            "components",
            `${sanitizedName}-list-row-actions`,
            "index.ts",
          ),
          templateFile: path.join(
            __dirname,
            "templates/components/module-list-row-actions/index.hbs",
          ),
        },
      ];

      const constants = [
        {
          type: "add",
          path: path.join(
            basePath,
            "constants",
            `${sanitizedName}-list.columns.tsx`,
          ),
          templateFile: path.join(
            __dirname,
            "templates/constants/module-list.columns.hbs",
          ),
        },
        {
          type: "add",
          path: path.join(basePath, "constants", `${sanitizedName}.paths.ts`),
          templateFile: path.join(
            __dirname,
            "templates/constants/module.paths.hbs",
          ),
        },
        {
          type: "add",
          path: path.join(
            basePath,
            "constants",
            `${sanitizedName}.permissions.ts`,
          ),
          templateFile: path.join(
            __dirname,
            "templates/constants/module.permissions.hbs",
          ),
        },
        {
          type: "add",
          path: path.join(basePath, "constants", `${sanitizedName}.queries.ts`),
          templateFile: path.join(
            __dirname,
            "templates/constants/module.queries.hbs",
          ),
        },
      ];

      const pages = [
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
      ];

      if (data.withDetailsPage) {
        pages.push({
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

      return [...components, ...constants, ...pages];
    },
  });
};
