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
                // /!\ Don't do that: this targets elements on the interaction,
                // this won't work.
                applyTo: ".card, .card-body",
            },
        ],
    };
}

registry.category("website-plugins").add(WeatherOptionPlugin.id, WeatherOptionPlugin);
