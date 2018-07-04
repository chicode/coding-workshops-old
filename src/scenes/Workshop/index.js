import React from 'react'
import { Query, Home, Img } from 'components'
import Code from './Code'
import gql from 'graphql-tag'

import './index.scss'

export default class Workshop extends React.Component {
  state = {
    completed: false,
  }

  render() {
    console.log(this.props)
    return (
      <Query
        query={gql`
          query($id: ID!) {
            getWorkshop(id: $id) {
              id
              title
              language
              slides {
                title
                description
                instructions {
                  description
                  correctCode
                }
              }
            }
          }
        `}
        variables={{
          id: this.props.match.params.id,
        }}
      >
        {({ data: { getWorkshop: workshop } }) => {
          const slideIndex = this.props.match.params.slide
          if (!(slideIndex in workshop.slides)) {
            return <p>That slide does not exist!</p>
          }
          const slide = workshop.slides[slideIndex]
          return (
            <div styleName="root">
              <div styleName="reading">
                <h1>{slide.title}</h1>
                <p>{slide.description}</p>
                <h2>Instructions</h2>
                <ul>
                  {slide.instructions.map((instruction, i) => (
                    <li key={i}>{instruction.description}</li>
                  ))}
                </ul>
              </div>
              <div styleName="control">
                <div styleName="menubar">
                  <div styleName="navigation">
                    <Img src="left" onClick={this.previousSlide} active={slideIndex !== 0} />
                    <Img src="hamburger" onClick={this.expandMenu} />
                    <Img
                      src="right"
                      onClick={this.nextSlide}
                      active={slideIndex !== workshop.slides.length - 1 && this.state.completed}
                    />
                  </div>
                  <h2>{workshop.title}</h2>
                  <Home to={`/workshops/${workshop.id}`} />
                </div>
                <div styleName="code">
                  <Code language={workshop.language} code={'asdfasdfd'} />
                </div>
                <div styleName="console" />
              </div>
            </div>
          )
        }}
      </Query>
    )
  }
}
