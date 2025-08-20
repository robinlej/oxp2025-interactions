from odoo import http


class InteractionsDemo(http.Controller):
    @http.route('/interactions_demo/get_weather', auth='public', type='jsonrpc')
    def get_weather(self):
        # Data based on API call to Open-Meteo.com
        return {
            "daily": {
                "time": [
                    "2025-09-18",
                    "2025-09-19",
                    "2025-09-20",
                    "2025-09-21",
                    "2025-09-22",
                    "2025-09-23",
                    "2025-09-24",
                ],
                "temperature_2m_max": [
                    11.2,
                    11.3,
                    11.6,
                    11.9,
                    10.0,
                    11.0,
                    9.6
                ],
                "weathercode": [
                    0,
                    80,
                    18,
                    3,
                    61,
                    3,
                    61
                ]
            }
        }
