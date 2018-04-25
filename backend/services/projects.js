import uuid from 'uuid-v4'
import * as ProjectName from 'project-name-generator'
import moment from 'moment'
import Chance from 'chance'

const techs = ['React/Redux', 'Groovy/Grails', 'Java/Spring Boot', 'Java/RabbitMQ', 'Python/Django', 'Ruby on Rails', 'Express/Node.js', 'Microservices', 'Elixir/Phoenix', 'Elm', 'C/C++']

const newProject = () => {
  const chance = new Chance()
  return {
    id: uuid(),
    projectName: ProjectName.generate().dashed,
    tech: chance.pickone(techs),
    buildHistory: [ ],
  }
}

let memoryDatabase = [
  newProject(),
  newProject(),
  newProject(),
]

const newRandomBuildHistory = () => {
  const rand = Math.random()
  const chance = new Chance()
  return {
    buildTime: moment().format(),
    status: rand > 0.5 ? 'success' : rand > 0.2 ? 'warning' : 'error',
    commit: chance.string({ pool: 'abcdef0123456789', length:7 })
  }
}

const addRandomBuildHistory = (project) => {
  if (Math.random() > 0.75) {
    return { ...project, buildHistory: [ ...project.buildHistory, newRandomBuildHistory() ] }
  } else {
    return project
  }
}

export const findAll = () => {
  return memoryDatabase = memoryDatabase.map(addRandomBuildHistory)
}

export const findById = (findId) => {
  return findAll().find(p => p.id === findId)
}

export const register = (project) => {
  const newProject = { ...project, id: uuid(), buildHistory: [ ] }
  memoryDatabase = [ ...memoryDatabase, newProject ]
  return newProject
}

export const unregister = (removeId) => {
  memoryDatabase = memoryDatabase.filter(p => p.id !== removeId)
}

export const update = (updateId, project) => {
  if (updateId === project.id) {
    const excluding = memoryDatabase.filter(p => p.id !== updateId)
    const prev = memoryDatabase.find(p => p.id === updateId)
    if (prev) {
      memoryDatabase = [ ...excluding, { ...prev, projectName: project.projectName } ]
    }
  }
}

export const build = (buildId) => {
  const project = memoryDatabase.find(p => p.id === buildId)
  if (project) {
    const newProject = { ...project, buildHistory: [ ...project.buildHistory, newRandomBuildHistory() ] }
    const excluding = memoryDatabase.filter(p => p.id !== buildId)
    memoryDatabase = [ ...excluding, newProject ]
    return newProject
  }
}
