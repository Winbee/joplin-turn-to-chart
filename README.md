# :memo::curly_loop::bar_chart: Transforms tables to charts

The goal of this Joplin plugin is to render a chart based on a markdown table with minimum configuration.

![Category Example](./doc/categoryExample.gif)

![Date Example](./doc/dateExample.gif)

# How to install

- Download the last release from this repository.
- Open `Joplin > Options > Plugins > Install from File`
- Select the jpl file you downloaded.

# How to use

- In your markdown page, create a table which respects this contraints:
  - Have at least 2 columns
  - All columns except the first one are numbers.
- Wrap your table with ` ```turnToChart` and ` ``` `
- Add options after the table

*Example with extra options:*
```
year        | apple | pear
----------- | ----- | -----
2019        | 2     | 3
2020        | 4     | 6
2021        | 3     | 8


xAxisType: date
xAxisNbOfTicks: 4
yAxisFormat: ($.0f
yAxisNbOfTicks: 4
yAxisOrigin: from zero
```

## Available options

You have the possiblity to modify the chart by adding options after the table. There should be one option per line and it should follow the following syntax:  `optionKey: value of this option`.


### xAxisType
| optionKey      | possible values                     | behavior when no value   |
| ---            | ---                                 | ---            |
| xAxisType      | `number` or `date` or  `category`   | autodetected     |

It supports 3 types of data:
- `number`: numerical value as a continuous range
- `date`: date value as a continuous range
- `category`: string value as a discrete range

*Example where we enforce a `date` type with the normal syntax:*
```
year        | apple | pear
----------- | ----- | -----
2019        | 2     | 3
2020        | 4     | 6

xAxisType: date
```


Note that you can also pass this option by providing it in square bracket `[]` in the first cell of the table.
*Example where we enforce a `date` type with the square bracket `[]` syntax:*
```
year [date] | apple | pear
----------- | ----- | -----
2019        | 2     | 3
2020        | 4     | 6
```

### xAxisFormat
| optionKey      | possible values                     | behavior when no value  |
| ---            | ---                                 | ---            |
| xAxisFormat    | see [d3-format](https://github.com/d3/d3-format) for `number` xAxisType and [d3-time-format](https://github.com/d3/d3-time-format) for `date` xAxisType   | none     |

### yAxisFormat
(see xAxisFormat)

### xAxisNbOfTicks
| optionKey      | possible values               | behavior when no value  |
| ---            | ---                           | ---            |
| xAxisNbOfTicks | should be a positive number   | autodetected   |

### yAxisNbOfTicks
(see xAxisNbOfTicks)

### xAxisOrigin
| optionKey      | possible values               | behavior when no value  |
| ---            | ---                           | ---            |
| xAxisOrigin | `from zero` or `from data boundaries`  | Use `from data boundaries`   |

Note that you can enable the `from zero` option by adding `:` in the horizontal delimiters on the first column.

*Note:* This rule is ignored for `date` and `category` type axis.

### yAxisOrigin
(see xAxisOrigin)

Note that you can enable the `from zero` option by adding `:` in the horizontal delimiters on any other column after the first one.

## Units
The unit for the x-axis is the full string of the first cell of the header.
The units for the y-axis are the string in parentheses `()` of each subsequent cells of the header.

## Comments
Any string surrounded by `<!--` and `-->` will be ignored by the plugin.

*Example of a table with comments:*
```
year  <!--this is a comment -->      | apple | pear
-----------------------------------  | ----- | -----
2019                                 | 2     | 3 <!-- another comment --> 
2020                                 | 4     | 6
```

# Development
If you want to contribute to this plugin you can find here some userful references:

- [Joplin - Getting started with plugin development](https://joplinapp.org/api/get_started/plugins/)
- [Joplin - Plugin API reference](https://joplinapp.org/api/references/plugin_api/classes/joplin.html)
- [Joplin - Data API reference](https://joplinapp.org/api/references/rest_api/)
- [Joplin - Plugin examples](https://github.com/laurent22/joplin/tree/dev/packages/app-cli/tests/support/plugins)
