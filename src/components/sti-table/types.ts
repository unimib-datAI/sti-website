import '@tanstack/react-table' //or vue, svelte, solid, qwik, etc.
import { type ColumnMeta, type RowData } from '@tanstack/react-table'

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    width?: string,
    class?: string
  }
}

export interface IColumns {
  author: string
  year: number
  title: string
  "conference-journal": string
  "name-of-approach": string
  "main-method": string
  technique: string
  domain: string
  type: string
  tasks: ITasks
  steps: ISteps
  "user-revision": UserRevision
  validation?: string
  "code-availability": string
  licence: string
  "repository-link": string
  inputs: IInputs
  "output-format": string
  "validation (gs)"?: string
}

export interface ITasks {
  cta: boolean
  cpa: boolean
  cea: boolean
  cnea: boolean
}

export interface ISteps {
  "data-preparation": string
  "spell-checker": string
  "units-of-measurements": string
  "subject-detection": string
  "column-analysis": string
  "type-annotation": string
  "predicate-annotation": string
  "datatype-annotation": string
  "entity-linking": IEntityLinking
  "nil-annotation": string
}

export interface IEntityLinking {
  "candidate-generation": string
  "entity-disambiguation": string
}

export interface UserRevision {
  type: string
  description: string
}

export interface IInputs {
  "type-of-table": string
  kg: IKg
}

export interface IKg {
  "triple-store": string
  index: string
}
