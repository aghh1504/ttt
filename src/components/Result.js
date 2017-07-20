import React, {Component} from 'react'

export default class Result extends Component {
  render() {
    const {services} = this.props
    return(
      <div>
        {

            services &&
            <div>
            <h2>{`${this.props.routes[0].locationName} - ${this.props.routes[0].filterLocationName}`}</h2>
            {
              this.props.routes[0].trainServices.map(train => {
                return (
                  <div>
                    <p>{`The next train will arrive at ${train.sta}`}</p>
                    <p>{`The next train will arrive at ${train.operator}`}</p>
                    <p>{`The next train will arrive at ${train.platform}`}</p>
                    {  train.delayReason !== null ? <p>{` ${train.delayReason}`}</p> : <p>There are no delays</p> }
                  </div>
                )
              })
            }

      </div>
    )
  }
  </div>
}
