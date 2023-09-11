export function notFound(resource = "Item") {
    return {
        type: "notFound", 
        message: `${resource} não foi encontrado`
    }
}

export function conflict(resource) {
    return {
        type: "conflict", 
        message: `${resource ? resource : "Item"} já existe!`
    }
}

export function incoherent(resource) {
    return {
        type: "conflict", 
        message: `Incoerencia quanto ${resource ? "a " + resource : "ao Item"}`
    }
}

export function incompleteData() {
    return {
        type: "incompleteData",
        message: `Preencha todos os dados!`
    }
}

export function invalidId() {
    return {
        type: "invalidId",
        message: `ID inválido! Deve ser um número inteiro maior que zero.`
    }
}

export function unprocessableEntity(resource) {
    return {
        type: "unprocessableEntity",
        message: `Incoerencia quanto ${resource ? "a " + resource : "ao Item"}`
    }
}

export const errors = {notFound, conflict, incoherent, incompleteData, unprocessableEntity, invalidId}