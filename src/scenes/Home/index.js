import React from 'react'
import { Query, Img } from 'components'
import gql from 'graphql-tag'

import './index.scss'

export default class Home extends React.Component {
  render() {
    return (
      <Query
        query={gql`
          query {
            getAllWorkshop {
              title
              id
              description
              level
              language
            }
          }
        `}
      >
        {({ data: { getAllWorkshop: workshops } }) => (
          <div styleName="root">
            <div styleName="heading">
              <h1>Coding Workshops</h1>
              <Img src="languages" />
            </div>
            <div styleName="workshop-tiles">
              {workshops.map((workshop) => (
                <a key={workshop.id} href={`workshops/${workshop.id}`} styleName="workshop-tile">
                  <h2>{workshop.title}</h2>
                  <p>{workshop.description}</p>
                  <div styleName="extra-info">
                    <p>{workshop.level}</p>
                    <p>{workshop.language}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </Query>
    )
  }
}
