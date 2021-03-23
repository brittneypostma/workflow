import { Writable } from 'svelte/store'

export function persistedStore<A>(initialValue: A, key: string): Writable<A>
