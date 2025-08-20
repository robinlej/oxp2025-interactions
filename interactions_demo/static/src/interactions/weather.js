import { formatDate, parseDate } from "@web/core/l10n/dates"
import { rpc } from "@web/core/network/rpc";
import { registry } from "@web/core/registry";
import { Interaction } from "@web/public/interaction";

export class Weather extends Interaction {
    static selector = ".s_weather";

    dynamicContent = {
        ".weather-location-name": {
            "t-out": () => this.locationName.charAt(0).toUpperCase() + this.locationName.slice(1),
        },
        ".weather-cards-container": {
            "t-att-class": () => ({ "row": !!this.locationName }),
        },
        "#weather-location-input": { "t-on-change": this.onInputChange },
    };

    /**
     * Do in `setup` everything that is already available before the
     * interaction is started. Only synchronous stuff.
     */
    setup() {
        this.locationName = this.el.dataset.locationName;
        this.cardsContainerEl = this.el.querySelector(".weather-cards-container");
    }

    /**
     * In `willStart`, keep only asynchronous code without which the interaction
     * cannot work.
     */
    async willStart() {
        this.weatherData = await rpc(
            "/interactions_demo/get_weather",
            { location: this.locationName }
        );
    }

    /**
     * Do in `start` what has to wait for the interaction to be started.
     * Typically: wait for the listeners to be attached, wait for asynchronous
     * code from `willStart`...
     */
    start() {
        this.updateWeather();
    }

    updateWeather() {
        if (this.weatherData.error) {
            return;
        }
        this.days = this.weatherData.daily.temperature_2m_max.map((temperature, index) => {
            let img;
            const weatherCode = this.weatherData.daily.weathercode[index];
            if (weatherCode === 0) {
                img = "sun";
            } else if (weatherCode === -1) {
                img = "sun_hot";
            } else if (weatherCode === -2) {
                img = "unicorn";
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

        // `removeChildren` and `renderAt` are Interaction utils. You don't have
        // to think about undoing them in the `destroy` method: it's handled by
        // design.
        // This goes for all the default methods that you can find in
        // `web/static/src/public/interaction.js`.
        this.removeChildren(this.cardsContainerEl);
        this.renderAt(
            "interactions_demo.s_weather.cards",
            { days: this.days },
            this.cardsContainerEl
        );
    }

    async onInputChange(ev) {
        this.locationName = ev.currentTarget.value;
        this.weatherData = await this.waitFor(
            rpc("/interactions_demo/get_weather", { location: this.locationName })
        );
        this.updateWeather();
    }
}

registry
    .category("public.interactions")
    .add("interactions_demo.weather", Weather);

registry
    .category("public.interactions.edit")
    .add("interactions_demo.weather", { Interaction: Weather });
