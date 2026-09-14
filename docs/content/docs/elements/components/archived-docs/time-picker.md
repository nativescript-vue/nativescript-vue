---
title: TimePicker
apiRef: https://docs.nativescript.org/api-reference/classes/_ui_time_picker_.timepicker
contributors: [MisterBrownRSA, rigor789, ikoevska]
---

`<TimePicker>` is a UI component that lets users select time. 

> See also: [DatePicker](/en/docs/elements/components/date-picker).

---

```html
<TimePicker :hour="selectedHour" :minute="selectedMinute" />
```

`<TimePicker>` provides two-way data binding using `v-model`.

```html
<TimePicker v-model="selectedTime" />
```

[> screenshots for=TimePicker <]

## Props

| Name | Type | Description |
|------|------|-------------|
| `hour` | `Number` | Gets or sets the selected hour.
| `minute` | `Number` | Gets or sets the selected minute.
| `time` | `Date` | Gets or sets the selected time.
| `minHour` | `Number` | Gets or sets the minimum selectable hour.
| `maxHour` | `Number` | Gets or sets the maximum selectable hour.
| `minMinute` | `Number` | Gets or sets the minimum selectable minute.
| `maxMinute` | `Number` | Gets or sets the maximum selectable minute.
| `minuteInterval` | `Number` | Gets or sets the selectable minute interval. For example: 5 or 15 minutes.<br/>Default value: `1`.

## Events

| Name | Description |
|------|-------------|
| `timeChange` | Emitted when the selected time changes.

## Native component

| Android | iOS |
|---------|-----|
| [`android.widget.TimePicker`](https://developer.android.com/reference/android/widget/TimePicker) | [`UIDatePicker`](https://developer.apple.com/documentation/uikit/uidatepicker)
