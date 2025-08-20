import { BuilderAction } from "@html_builder/core/builder_action";
import { layoutOptionSelector } from "@html_builder/utils/grid_layout_utils";
import { Plugin } from "@html_editor/plugin";
import { registry } from "@web/core/registry";
import { patch } from "@web/core/utils/patch";

patch(layoutOptionSelector, {
    exclude: layoutOptionSelector.exclude + ", .s_weather",
});

class WeatherOptionPlugin extends Plugin {
    static id = "weatherOption";
    resources = {
        builder_options: [
            {
                template: "interactions_demo.WeatherOption",
                selector: ".s_weather",
            },
            {
                template: "interactions_demo.WeatherThemeOption",
                selector: ".s_weather",
                applyTo: ".weather-cards-container",
            },
        ],
        builder_actions: {
            WeatherTitleAction,
        },
    };
}

export class WeatherTitleAction extends BuilderAction {
    static id = "weatherTitle";

    isApplied({ editingElement, value }) {
        return editingElement.querySelector("h2").classList.contains(value);
    }
    apply({ editingElement, value }) {
        const titleEl = editingElement.querySelector("h2");
        titleEl.classList.add(value);
        const locationNameEl = titleEl.querySelector(".weather-location-name");

        if (value === "classic") {
            titleEl.textContent = "'s Weather";
            titleEl.prepend(locationNameEl);
        } else if (value === "unicorny") {
            titleEl.textContent = "🦄🦄🦄🌈🌈 Weather in ";
            titleEl.appendChild(locationNameEl);
            titleEl.append(" ☀️☀️🦄🦄🦄");
        }
    }
    clean({ editingElement, value }) {
        editingElement.querySelector("h2").classList.remove(value);
    }
}

registry.category("website-plugins").add(WeatherOptionPlugin.id, WeatherOptionPlugin);
