export function SidebarLogo({ registerComponent }) {
  registerComponent('sidebar:start', {
    template: `
      <div class="Logo" router-link="/">
        <img src="https://art.nativescript-vue.org/NativeScript-Vue-Green-White.png" alt="NativeScript-Vue">
        <img src="https://art.nativescript-vue.org/NativeScript-Vue-White-Green.png" alt="NativeScript-Vue">
      </div>
    `,
  })
}