import { formatDate, parseDate } from "@web/core/l10n/dates"
import { rpc } from "@web/core/network/rpc";
import { registry } from "@web/core/registry";
import { Interaction } from "@web/public/interaction";

export class Weather extends Interaction {
    static selector = ".s_weather";

    dynamicContent = {
        ".weather-location-name": { "t-out": () => this.el.dataset.locationName },
        ".weather-cards-container": {
            "t-att-class": () => ({ "row": !!this.locationName }),
        },
    };

    /**
     * Do in `setup` everything that is already available before the
     * interaction is started. Only synchronous stuff.
     */
    setup() {
        this.locationName = this.el.dataset.locationName;
    }

    /**
     * In `willStart`, keep only asynchronous code without which the interaction
     * cannot work.
     */
    async willStart() {
        this.weatherData = await rpc("/interactions_demo/get_weather");
    }

    /**
     * Do in `start` what has to wait for the interaction to be started.
     * Typically: wait for the listeners to be attached, wait for asynchronous
     * code from `willStart`...
     */
    start() {
        this.days = this.weatherData.daily.temperature_2m_max.map((temperature, index) => {
            let img;
            const weatherCode = this.weatherData.daily.weathercode[index];
            if (weatherCode === 0) {
                img = "sun";
            } else if (weatherCode < 3) {
                img = "sun_clouds";
            } else if (weatherCode <= 20) {
                img = "clouds";
            } else {
                img = "rain";
            }
            return {
                date: formatDate(
                    parseDate(this.weatherData.daily.time[index]), { format: "EEEE d MMM" }
                ),
                temp: temperature,
                img,
            };
        }).splice(0, 5);

        this.renderAt(
            "interactions_demo.s_weather.cards",
            { days: this.days },
            this.el.querySelector(".weather-cards-container")
        );
    }
}

registry
    .category("public.interactions")
    .add("interactions_demo.weather", Weather);

// registry
//     .category("public.interactions.edit")
//     .add("interactions_demo.weather", { Interaction: Weather });
