import {
    getDocs,
    collection,
    query,
    where,
    deleteDoc,
    doc,
    updateDoc
} from "firebase/firestore";

import React, { useState } from 'react';
import { db } from '../firebase'

export const CollectionName = {
    USER_LOGIN: 'user-login'
}

export const findAllUserLogin = async () => {
    const dbRef = await getDocs(collection(db, CollectionName.USER_LOGIN))

    const data = []

    dbRef.forEach(item => {
        data.push({
            id: item.id,
            ...item.data()
        })
    })
    return data
}

export const findHost = async () => {
    const collection_ref = collection(db, CollectionName.USER_LOGIN)
    const q = query(collection_ref, where("isHost", "==", true))
    const doc_refs = await getDocs(q);

    const res = []

    doc_refs.forEach(item => {
        res.push({
            id: item.id,
            ...item.data()
        })
    })

    return res
}

export const updateRole = async (docId, role) => {
    const doc_ref = doc(db, CollectionName.USER_LOGIN, docId)
    await updateDoc(doc_ref, {
        role: role
    })
}

const useFirestore = (collection, condition) => {
    const [documents, setDocuments] = useState([]);

    React.useEffect(() => {
        let collectionRef = db.collection(collection).orderBy('createdAt');
        if (condition) {
            if (!condition.compareValue || !condition.compareValue.length) {
                // reset documents data
                setDocuments([]);
                return;
            }

            collectionRef = collectionRef.where(
                condition.fieldName,
                condition.operator,
                condition.compareValue
            );
        }

        const unsubscribe = collectionRef.onSnapshot((snapshot) => {
            const documents = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));

            setDocuments(documents);
        });

        return unsubscribe;
    }, [collection, condition]);

    return documents;
};

export default useFirestore;

export const deleteData = async () => {

    const allUser = await findAllUserLogin()
    for (let index = 0; index < allUser.length; index++) {
        let ref = doc(db, CollectionName.USER_LOGIN, allUser[index].id)
        await deleteDoc(ref)
    }

    window.location.reload()

    // 
    // collection_ref.remove()
}



