export const typePolicies = {
  User: {
    fields: {
      followers: {
        merge(_, incoming) {
          return incoming
        }
      }
    }
  },
  Query: {
    fields: {
      getPosts: {
        keyArgs: [],
        merge(existingFrozen, incoming, { args: { offset = 0 }}) {
          // Slicing is necessary because the existing data is
          // immutable, and frozen in development.
          const existing = existingFrozen ? existingFrozen.slice(0) : []
          const merged = Array.from({ length: offset + incoming.length })
            .map((_, i) => existing[i] || incoming[i - offset])

          return merged
        }, // end of merge
      }
    }
  }
}
