import { defineStore } from 'pinia'
import type { PreferenceType } from '../lib/preferenceSchema';

export const usePreferencesStore = defineStore('preferenceStore', () => {
    const preferences = ref<PreferenceType | object>({})

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