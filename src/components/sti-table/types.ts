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
  title: ITitle
  "conference-journal": string
  "name-of-approach": string
  "main-method": IMethod
  domain: IDomain
  tasks: ITasks
  steps: ISteps
  "user-revision": IUserRevision
  validation?: string
  "code-availability": string
  licence: string
  inputs: IInputs
  "output-format": string
  "validation (gs)"?: string
}

export interface ITitle {
  text: string;
  link: string;
}

export interface IMethod {
  type: string
  technique: string
}

export interface IDomain {
  domain: string;
  type: string;
}

export interface ITasks {
  cta: boolean
  cpa: boolean
  cea: boolean
  cnea: boolean
}

export interface ISteps {
  "data-preparation": IDataPreparation
  "subject-detection": string
  "column-analysis": string
  "type-annotation": string
  "predicate-annotation": string
  "datatype-annotation": string
  "entity-linking": IEntityLinking
  "nil-annotation": string
}

export interface IDataPreparation {
  "description": string
  "spell-checker": string
  "units-of-measurements": string
}

export interface IEntityLinking {
  "description": string,
  "candidate-generation": string,
  "entity-disambiguation": string
}

export interface IUserRevision {
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
