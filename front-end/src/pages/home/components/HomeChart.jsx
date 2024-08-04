// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/line
import { ResponsiveLine } from '@nivo/line'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const theme = {
    "background": "#191a1f",
    "text": {
        "fontSize": 8,
        "fill": "#ffffff",
        "outlineWidth": 0,
        "outlineColor": "#ffffff"
    },
    "axis": {
        "domain": {
            "line": {
                "stroke": "#191a1f",
                "strokeWidth": 1
            }
        },
        "legend": {
            "text": {
                "fontSize": 12,
                "fill": "#ffffff",
                "outlineWidth": 0,
                "outlineColor": "transparent"
            }
        },
        "ticks": {
            "line": {
                "stroke": "#191a1f",
                "strokeWidth": 1
            },
            "text": {
                "fontSize": 11,
                "fill": "#ffffff",
                "outlineWidth": 0,
                "outlineColor": "transparent"
            }
        }
    },
    "grid": {
        "line": {
            "stroke": "#dddddd",
            "strokeWidth": 1
        }
    },
    "legends": {
        "title": {
            "text": {
                "fontSize": 11,
                "fill": "#ffffff",
                "outlineWidth": 0,
                "outlineColor": "transparent"
            }
        },
        "text": {
            "fontSize": 11,
            "fill": "#ffffff",
            "outlineWidth": 0,
            "outlineColor": "transparent"
        },
        "ticks": {
            "line": {},
            "text": {
                "fontSize": 10,
                "fill": "#ffffff",
                "outlineWidth": 0,
                "outlineColor": "transparent"
            }
        }
    },
    "annotations": {
        "text": {
            "fontSize": 13,
            "fill": "#ffffff",
            "outlineWidth": 2,
            "outlineColor": "#ffffff",
            "outlineOpacity": 1
        },
        "link": {
            "stroke": "#ffffff",
            "strokeWidth": 1,
            "outlineWidth": 2,
            "outlineColor": "#ffffff",
            "outlineOpacity": 1
        },
        "outline": {
            "stroke": "#ffffff",
            "strokeWidth": 2,
            "outlineWidth": 2,
            "outlineColor": "#ffffff",
            "outlineOpacity": 1
        },
        "symbol": {
            "fill": "#ffffff",
            "outlineWidth": 2,
            "outlineColor": "#ffffff",
            "outlineOpacity": 1
        }
    },
    "tooltip": {
        "wrapper": {},
        "container": {
            "background": "#191a1f",
            "color": "#ffffff",
            "fontSize": 10
        },
        "basic": {},
        "chip": {},
        "table": {},
        "tableCell": {},
        "tableCellValue": {}
    }
}

const HomeChart = ({ data /* see data tab */ }) => (

    <ResponsiveLine
        colors={["#20E6A3","#008FFB"]}
        theme={theme}
        data={data}
        margin={{ top: 25, right: 10, bottom: 26, left:10 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 0 ,
            max: 'auto',
            stacked: false,
            reverse: false
        }}
        yFormat=" >-"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legendOffset: 36,
            legendPosition: 'middle',
            truncateTickAt: 0
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
            legendOffset: -40,
            legendPosition: 'middle',
            truncateTickAt: 0
        }}
        enableGridY={false}
        enableGridX={false}
        pointSize={7}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        enablePointLabel={true}
        pointLabel="data.yFormatted"
        pointLabelYOffset={-10}
        enableCrosshair={false}
        isInteractive={false}
        useMesh={true}
        legends={[
            {
                anchor: 'top',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: -20,
                itemsSpacing: 20,
                itemDirection: 'left-to-right',
                itemWidth: 50,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 8,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
)


export default HomeChart;



