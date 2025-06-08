import "98.css";
import "./app.css";

import { mount } from 'svelte';
import App from "./App.svelte";

const app = mount(App, { target: document.body });

export default app;
