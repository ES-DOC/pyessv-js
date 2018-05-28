// Returns first node matchied within a collection.
const getNode = (collection, name) => {
    return _.find(collection, (i) => {
        return i.canonicalName.toLowerCase() === name.toLowerCase();
    });
}

// A node within the domain model.
class Node {
    // Instance ctor.
    constructor (n) {
        _.each(_.keys(n), (key) => {
            this[key] = n[key];
        });
    }
}

// An entity publishing a vocabulary: e.g. esdoc.
export class Authority extends Node {
    // Instance ctor.
    constructor (a) {
        super(a);
        this.scopes = _.map(a.scopes, (s) => {
            return new Scope(a, s);
        });
    }

    // Return a child scope.
    getScope (name) {
        return getNode(this.scopes, name);
    }
}

// A scopoed set of term collections: e.g. errata.
export class Scope extends Node {
    // Instance ctor.
    constructor (a, s) {
        super(s);
        this.authority  = a;
        this.collections = _.map(s.collections, (c) => {
            return new Collection(a, s, c);
        });
    }

    getCollection (name) {
        return getNode(this.collections, name);
    }

    // Returns all terms within matched collection.
    getTerms (collectionName) {
        let collection = this.getCollection(collectionName);
        if (collection) {
            return _.sortBy(collection.terms, (i) => {
                return _.has(i.data, 'sortOrdinal') ? i.data.sortOrdinal : i.canonicalName;
            })
        }
    }

    // Returns matched term within matched collection.
    getTerm (collectionName, termName) {
        let collection = this.getCollection(collectionName);
        if (collection) {
            return getNode(collection.terms, termName);
        }
    }
}

// A collection of terms: e.g. severity.
class Collection extends Node {
    // Instance ctor.
    constructor (a, s, c) {
        super(c);
        this.authority  = a;
        this.scope  = s;
        this.terms = _.map(c.terms, (t) => {
            return new Term(a, s, c, t);
        });
   }
}

// A vocabulary term: e.g. high.
class Term extends Node {
    // Instance ctor.
    constructor (a, s, c, t) {
        super(t);
        this.authority  = a;
        this.scope  = s;
        this.collection  = c;
    }
}
