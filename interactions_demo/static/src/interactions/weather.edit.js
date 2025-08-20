import { Weather } from "./weather";
import { registry } from "@web/core/registry";

/**
 * This is the way to override an existing interaction, to make it behave
 * differently in edit mode vs. on the public page.
 * If you don't have a public interaction but need an edit one, you can of
 * course create an edit interaction and add it to the edit registry only.
 */
const WeatherEdit = (I) => class extends I {
    /* Solution 1 */
    dynamicContent = {
        ...this.dynamicContent,
        _locationInput: { },
    };

    /* Solution 2 */
    // onInputChange() { }
};

registry
    .category("public.interactions.edit")
    .add("interactions_demo.weather", {
        Interaction: Weather,
        mixin: WeatherEdit,
    });
