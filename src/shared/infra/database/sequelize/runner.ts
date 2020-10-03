async function runner (promises) {
    for (let command of promises) {
        try {
            await command();
        } catch (err) {
            if (err.original) {
                if (err.original.code == "ER_DUP_ENTRY") {
                    console.log(`>>> Passable error occured: ER_DUP_ENTRY`)
                } else if (err.original.code == "ER_DUP_FIELDNAME") {
                    console.log(`>>> Passable error occured: ER_DUP_FIELDNAME`)
                } else if (err.original.code == "ER_CANT_DROP_FIELD_OR_KEY") {
                    console.log(`>>> Passable error occured: ER_CANT_DROP_FIELD_OR_KEY`)
                } else {
                    console.log(err);
                    throw new Error(err);
                }
            } else {
                console.log(err);
                throw new Error(err);
            }
        }
    }
}

export default {
    run: runner
}