{
    'name': "Interactions Demo",
    'summary': "Interactions demo for the Odoo Experience 2025",
    'description': """
    Provides a snippet to display the weather forecast.
    Presents the features of interactions in the context of the website builder.
    """,
    'installable': True,

    'author': "ROLE (Odoo)",
    'website': "https://www.odoo.com",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/15.0/odoo/addons/base/data/ir_module_category_data.xml
    # for the full list
    'category': 'Website/Website',
    'version': '0.1',

    # any module necessary for this one to work correctly
    'depends': ['base', 'website'],

    # always loaded
    'data': [
        # 'security/ir.model.access.csv',
        'views/snippets/snippets.xml',
        'views/snippets/s_weather.xml',
    ],

    'assets': {
        'web.assets_frontend': [
            'interactions_demo/static/src/interactions/**/*',
        ],
    },
    'license': 'LGPL-3',
}
