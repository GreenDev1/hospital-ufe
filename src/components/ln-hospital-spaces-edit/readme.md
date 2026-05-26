# ln-hospital-spaces-edit



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute | Description | Type       | Default     |
| ------------------- | --------- | ----------- | ---------- | ----------- |
| `existingPavilions` | --        |             | `string[]` | `[]`        |
| `opened`            | `opened`  |             | `boolean`  | `false`     |
| `role`              | `role`    |             | `string`   | `'general'` |
| `space`             | `space`   |             | `any`      | `{}`        |


## Events

| Event           | Description | Type                |
| --------------- | ----------- | ------------------- |
| `editor-closed` |             | `CustomEvent<void>` |
| `editor-saved`  |             | `CustomEvent<any>`  |


## Dependencies

### Used by

 - [ln-hospital-spaces-list](../ln-hospital-spaces-list)

### Graph
```mermaid
graph TD;
  ln-hospital-spaces-list --> ln-hospital-spaces-edit
  style ln-hospital-spaces-edit fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
