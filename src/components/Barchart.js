export const Chart = ({ children, height, width }) => (
    <svg className='chart-container' viewBox={`0 0 ${width} ${height}`}
      height={height + 400}
      width={width + 340}>
      {children}
    </svg>
  )
  
  export const Bar = ({ fill, x, y, height, width, name, image, maxHeight }) => {
    const [firstName, lastName] = name.split(' ');
    return (<>
      <image x={x} y={maxHeight} height={maxHeight - 15} width={width + 5} href={image} />
      <text x={x} y={maxHeight + 40} height={height} width={width} fill={fill} fontSize='8'>
        <tspan y={maxHeight + 40}>{firstName}</tspan>
        <tspan x={x} y={maxHeight + 50}>{lastName}</tspan>
      </text>
      <rect x={x} y={y} height={height} width={width + 5} fill={fill} />
      <text x={x + (width / 4)} y={y - 5}  fill={fill}>{height} </text>
    </>
    )
  }
  
  export const BarChart = ({ chartBars }) => {
    if (chartBars.length > 0) {
      const barWidth = 20
      const barMargin = 15
      const width = chartBars.length * (barWidth + barMargin)
      const height = Math.max(...chartBars.map(barDetails => {
        return barDetails.value;
      }))
      return (
        <Chart height={height} width={width}>
          {chartBars.map((barDetails, index) => {
            return <Bar key={barDetails.name}
              x={index * (barWidth + barMargin)}
              y={height - barDetails.value}
              width={barWidth}
              height={barDetails.value}
              maxHeight={height}
              name={barDetails.name}
              image={barDetails.image}
              fill='aliceblue' />
          })}
        </Chart>
      );
    }
  }
  
  