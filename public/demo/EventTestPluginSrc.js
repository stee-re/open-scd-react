
 
export default class EventTestPluginSrc extends HTMLElement {
     
    run() {
      console.log(`${this.tagName}.run() -> firing event`);
      this.dispatchEvent(new CustomEvent('test-event', {
        detail: { message: 'Hello from EventTestPluginSrc!' },
        bubbles: true,
        composed: true
      }));
    }
  }
  