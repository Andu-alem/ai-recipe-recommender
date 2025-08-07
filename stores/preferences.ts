import { defineStore } from 'pinia'
import type { PreferenceType } from '../lib/preferenceSchema'
import type { ObjectId } from 'mongoose'

export const usePreferencesStore = defineStore('preferenceStore', () => {
    const preference = ref<PreferenceType>()

    const addPreference = async (pref: PreferenceType, id?: ObjectId) => {
        try {
            await $fetch('/api/preference', {
                method: 'POST',
                body: {
                    pref,
                    id
                }
            })
            preference.value = {
                ...pref
            }
        } catch {
            throw new Error("Error while adding preference to database")
        }
    }

    return {
        preference,
        addPreference
    }
})