import React, { Component } from 'react'
import cx from 'classnames'
import 'es6-promise'
import 'isomorphic-fetch'

import LoadingSpinner from './components/loading-spinner'

const endpoint = 'https://services.metabase.com/api/v1/crm/survey-response'

class Survey extends Component {
  constructor(props) {
    super(props)
    this.state = {
      survey_type: undefined,
      reason: {},
      dislikes: {},
      nps: undefined,
      usage: undefined,
      source: {},
      company_size: undefined,
      comments: undefined,
      contact: {},
      ip: undefined,
      form: {
        submitting: false
      }
    }
    this.select = this.select.bind(this)
    this.submit = this.submit.bind(this)
  }

  componentDidMount () {
    this.setState({
      survey_type: this.props.type
    })
    this.fetchIP()
  }

  fetchIP() {
    fetch('https://api.ipify.org?format=json')
      .then((response) => response.json())
      .then(({ip}) => this.select('ip', ip))
  }

  select (key, payload) {
    this.setState({
      [key]: typeof(payload) === "object" ? Object.assign({}, this.state[key], payload) : payload
    })
  }

  submit (ev) {
    this.setState({
      form: {
        submitting: true
      }
    })
    ev.preventDefault()
    fetch(endpoint, {
      mode: 'no-cors',
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state)
    })
    .then((response) => {
      if(response.status >= 400) {
        this.setState({ error: true })
      } else {
        this.setState({
          form: {
            submitting: true
          }
        })
      }
      // Ask NPS promoters to kindly leave us a review on G2
      if(this.state.nps >= 9) {
        setTimeout(() => { window.location = `https://${window.location.host}/feedback/review` }, 400)
      } else {
        setTimeout(() => { window.location = `https://${window.location.host}/feedback/submitted` }, 400)
      }
    })
    .catch((error) => {
      console.log(error)
    })
  }

  getSurveyType() {
    switch(this.props.type) {
      case 'success':
        return <Success answer={this.state.reason.answer} select={this.select} />
      case 'abandon':
        return <Falloff answer={this.state.reason.answer} select={this.select} title='What has kept you from using Metabase?' options={FalloffOptions} answerKey='reason'/>
      default:
        return <div>
          <Success answer={this.state.reason.answer} select={this.select} />
          <Falloff answer={this.state.dislikes.answer} select={this.select} title='What can Metabase improve on?' options={ImprovementOptions} answerKey='dislikes'/>
        </div>
    }
  }

  render () {
    return (
      <div className="container ml-auto mr-auto measure">
        <div className="my2">
          { this.props.type == 'general' && <MetabaseUsage answer={this.state.usage} select={this.select}/>}
          { this.getSurveyType() }
          { this.props.type !== 'abandon' && <CompanySize answer={this.state.company_size} select={this.select}/>}
          <NPS answer={this.state.nps} select={this.select} />
          <Source answer={this.state.source.answer} select={this.select}/>
          <Comments answer={this.state.comments} select={this.select}/>
          <Contact answer={this.state.contact.answer} select={this.select}/>
          <div className="survey-section">
            <button className="Button Button--primary flex align-center justify-center" style={{width: 120, height: 'auto'}} onClick={this.submit} type="submit">
              {this.state.form.submitting ?
                <LoadingSpinner width={22} height={22} borderWidth={2} />
              : 'Submit'}
            </button>
          </div>
        </div>
      </div>
    )
  }
}

const FalloffOptions = [
  {
    option: 'Missing a feature I require',
    followup: 'What is Metabase missing?'
  },
  {
    option: 'Too complicated/confusing',
    followup: 'What could we improve to make it easier to use?'
  },
  {
    option: 'I found a better solution',
    followup: 'Do you mind telling us what you’re using instead?'
  },
  {
    option: 'My team didn’t like it',
    followup: 'Did they say what they didn’t like about it?'
  },
  {
    option: 'I forgot about it!',
    followup: 'Anything you want to add?'
  },
  {
    option: 'Other',
    followup: 'Anything you  want to add?'
  }
]

const ImprovementOptions = [
  {
    option: 'The query builder',
    followup: 'How can we make the query builder better?'
  },
  {
    option: 'Too complicated/confusing',
    followup: 'What could we improve to make it easier to use?'
  },
  {
    option: 'Charting',
    followup: 'Any thing in particular we could improve about charting?'
  },
  {
    option: 'Dashboards',
    followup: 'How could we improve dashboards?'
  },
  {
    option: 'Permissions',
  },
  {
    option: 'Pulses',
    followup: 'How can we make pulese better?'
  }
]

const Option = ({option, answer, answerKey, select}) => {
  let selection = option
  let followup

  if(option === Object(option)) {
    followup = option.followup
    option = option.option
    selection = { answer: option }
  }
  return (
    <div onClick={() => select(answerKey, selection)}>
      <div className={cx("survey-option", { "survey-option-selected" : answer === option})}>
        {option}
      </div>
      <div style={{marginLeft: 40}}>
        { option === answer && followup && <textarea className="input block full" placeholder={followup} onChange={(ev) => select(answerKey, {comments: ev.target.value})}></textarea> }
      </div>
    </div>
  )
}

const SuccessOptions = [
  {
    option: 'Easy to ask own questions',
  },
  {
    option: 'Dashboards and charts',
  },
  {
    option: 'Pulses',
  },
  {
    option: 'It\'s self hosted',
  },
  {
    option: 'It\'s open source',
  },
  {
    option: 'Other',
    followup: 'Care to elaborate?'
  }
]

const Success = ({answer, select}) =>
  <div className={cx("survey-section", {'survey-section-answered': answer !== undefined })}>
    <h4>What does your team like most about Metabase?</h4>
    {
      SuccessOptions.map((option, index) =>
        <Option
          option={option}
          answer={answer}
          key={index}
          select={select}
          answerKey='reason'
        />
      )
    }
  </div>

const CompanySizes = [
    '1-9',
    '10-25',
    '26-50',
    '50+'
]

const CompanySize = ({answer, select}) =>
  <div className={cx("survey-section", {'survey-section-answered': answer !== undefined })}>
    <h4>How big is your company?</h4>
    {
      CompanySizes.map((option, index) =>
        <Option
          option={option}
          answer={answer}
          key={index}
          select={select}
          answerKey='company_size'
        />
      )
    }
  </div>



const Usages = [
  'Never tried it',
  'Tried it but wasn’t right',
  'I use it by myself',
  'A few people in my company use it',
  'My entire company uses it'
]

const MetabaseUsage = ({answer, select}) =>
  <div className={cx("survey-section", {'survey-section-answered': answer !== undefined })}>
    <h4>How often do you use Metabase?</h4>
    {
      Usages.map((option, index) =>
        <Option
          option={option}
          answer={answer}
          key={index}
          select={select}
          answerKey='usage'
        />
      )
    }
  </div>

const Falloff = ({answer, select, title, options, answerKey}) =>
  <div className={cx("survey-section", {'survey-section-answered': answer !== undefined })}>
    <h4>{title}</h4>
    {
      options.map((option, index) =>
        <Option
          option={option}
          answer={answer}
          key={index}
          select={select}
          answerKey={answerKey}
        />
      )
    }
  </div>

const NPS_SCORE = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const NPS = ({select, answer}) =>
  <div className={cx("survey-section survey-nps", {'survey-section-answered': answer !== undefined })}>
    <h4>How likely is it you would recommend Metabase to a friend or colleague?</h4>
    <div style={{marginTop: '2em', marginBottom: '2em'}}>
      <div className="flex justify-between">
        { NPS_SCORE.map((score, index) => <Option option={score} answer={answer} answerKey='nps' key={index} select={select}/>) }
      </div>
      <div className="flex align-center justify-between text-light" style={{fontSize: '0.8em'}}>
        <div className="text-uppercase">Not at all likely</div>
        <div className="text-uppercase">Somewhat likely</div>
        <div className="text-uppercase">Very likely</div>
      </div>
    </div>
  </div>

const SOURCES = [
  {
    option: 'A friend or colleague',
  },
  {
    option: 'Twitter',
  },
  {
    option: 'Google',
  },
  {
    option: 'Github',
  },
  {
    option: 'Product Hunt',
  },
  {
    option: 'Hacker News',
  },
  {
    option: 'Other',
    followup: 'Where did you hear about Metabase?'
  }
]

const Source = ({answer, select}) =>
  <div className={cx("survey-section", {'survey-section-answered': answer !== undefined })}>
    <h4>How did you find out about Metabase?</h4>
    {
      SOURCES.map((source, index) => <Option option={source} key={index} answer={answer} answerKey='source' select={select} />)
    }
  </div>

const Comments = ({select}) =>
  <div className="survey-section">
    <h4>Any other comments for us?</h4>
    <textarea className="input full" onChange={(ev) => select('comments', ev.target.value)}></textarea>
  </div>

const CONTACT_OPTIONS = [
  {
    option: 'No'
  },
  {
    option: 'Sure, email me',
    followup: 'What\'s a good email to reach you at?'
  },
  {
    option: 'Sure, give me a call',
    followup: 'Where can we reach you?'
  }
]
const Contact = ({answer, select}) =>
  <div className={cx("survey-section", {'survey-section-answered': answer !== undefined })}>
    <h4>Can we contact you for more information?</h4>
    { CONTACT_OPTIONS.map((option, index) => <Option option={option} answer={answer} answerKey='contact' key={index} select={select}/> ) }
  </div>

export default Survey
