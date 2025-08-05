import { defineStore } from 'pinia'
import type { PreferenceType } from '../lib/preferenceSchema';

export const usePreferencesStore = defineStore('preferenceStore', () => {
    const preferences = ref<PreferenceType>()

    const addPreferences = (pref: PreferenceType) => {
        preferences.value = {
            ...pref
        }
    }

    return {
        preferences,
        addPreferences
    }
})