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
      const basePath = `src/modules/${sanitizedName}`;

      const components = [
        {
          type: "add",
          path: `${basePath}/components/{{name}}-form/{{name}}-form.tsx`,
          templateFile: path.join(
            __dirname,
            "templates/components/module-form/component.hbs",
          ),
        },
        {
          type: "add",
          path: `${basePath}/components/{{name}}-form/index.ts`,
          templateFile: path.join(
            __dirname,
            "templates/components/module-form/index.hbs",
          ),
        },
        {
          type: "add",
          path: `${basePath}/components/{{name}}-form-dialog/{{name}}-form-dialog.tsx`,
          templateFile: path.join(
            __dirname,
            "templates/components/module-form-dialog/component.hbs",
          ),
        },
        {
          type: "add",
          path: `${basePath}/components/{{name}}-form-dialog/index.ts`,
          templateFile: path.join(
            __dirname,
            "templates/components/module-form-dialog/index.hbs",
          ),
        },
        {
          type: "add",
          path: `${basePath}/components/{{name}}-list-toolbar/{{name}}-list-toolbar.tsx`,
          templateFile: path.join(
            __dirname,
            "templates/components/module-list-toolbar/component.hbs",
          ),
        },
        {
          type: "add",
          path: `${basePath}/components/{{name}}-list-toolbar/index.ts`,
          templateFile: path.join(
            __dirname,
            "templates/components/module-list-toolbar/index.hbs",
          ),
        },
        {
          type: "add",
          path: `${basePath}/components/{{name}}-list-row-actions/{{name}}-list-row-actions.tsx`,
          templateFile: path.join(
            __dirname,
            "templates/components/module-list-row-actions/component.hbs",
          ),
        },
        {
          type: "add",
          path: `${basePath}/components/{{name}}-list-row-actions/index.ts`,
          templateFile: path.join(
            __dirname,
            "templates/components/module-list-row-actions/index.hbs",
          ),
        },
      ];

      const constants = [
        {
          type: "add",
          path: `${basePath}/constants/{{name}}-list.columns.tsx`,
          templateFile: path.join(
            __dirname,
            "templates/constants/module-list.columns.hbs",
          ),
        },
        {
          type: "add",
          path: `${basePath}/constants/{{name}}.paths.ts`,
          templateFile: path.join(
            __dirname,
            "templates/constants/module.paths.hbs",
          ),
        },
        {
          type: "add",
          path: `${basePath}/constants/{{name}}.permissions.ts`,
          templateFile: path.join(
            __dirname,
            "templates/constants/module.permissions.hbs",
          ),
        },
        {
          type: "add",
          path: `${basePath}/constants/{{name}}.queries.ts`,
          templateFile: path.join(
            __dirname,
            "templates/constants/module.queries.hbs",
          ),
        },
      ];

      const pages = [
        {
          type: "add",
          path: `${basePath}/pages/{{name}}-list.page.tsx`,
          templateFile: path.join(
            __dirname,
            "templates/pages/module-list.page.hbs",
          ),
        },
        {
          type: "add",
          path: `${basePath}/pages/index.ts`,
          templateFile: path.join(__dirname, "templates/pages/index.hbs"),
        },
      ];

      if (data.withDetailsPage) {
        pages.push({
          type: "add",
          path: `${basePath}/pages/{{name}}-details.page.tsx`,
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
