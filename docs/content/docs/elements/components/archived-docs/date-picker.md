---
title: DatePicker
apiRef: https://docs.nativescript.org/api-reference/classes/_ui_date_picker_.datepicker
contributors: [MisterBrownRSA, rigor789, ikoevska]
---

`<DatePicker>` is a UI component that lets users select a date from a pre-configured range.

> See also: [TimePicker](/en/docs/elements/components/time-picker).

---

```html
<DatePicker :date="someDate" />
```

`<DatePicker>` provides two-way data binding using `v-model`.

```html
<DatePicker v-model="selectedDate" />
```

[> screenshots for=DatePicker <]

## Props

| Name | Type | Description |
|------|------|-------------|
| `date` | `Date` | Gets or sets the complete date.
| `minDate` | `Date` | Gets or sets the earliest possible date to select.
| `maxDate` | `Date` | Gets or sets the latest possible date to select.
| `day` | `Number` | Gets or sets the day.
| `month` | `Number` | Gets or sets the month.
| `year` | `Number` | Gets or sets the year.

## Events

| Name | Description |
|------|-------------|
| `dateChange` | Emitted when the selected date changes.

## Native component

| Android |	iOS |
|---------|-----|
| [`android.widget.DatePicker`](https://developer.android.com/reference/android/widget/DatePicker.html) | [`UIDatePicker`](https://developer.apple.com/documentation/uikit/uidatepicker)
