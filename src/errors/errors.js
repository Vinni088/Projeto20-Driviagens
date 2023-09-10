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

export const errors = {notFound, conflict, incompleteData, invalidId}