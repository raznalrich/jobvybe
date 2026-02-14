import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { addDoc, collection, getDocs, getFirestore, doc, updateDoc, deleteDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCUfyRo0SwoRkceyGLm9Tir5ydGBrPkli0',
  authDomain: 'jobvybe-e8802.firebaseapp.com',
  projectId: 'jobvybe-e8802',
  storageBucket: 'jobvybe-e8802.firebasestorage.app',
  messagingSenderId: '970543987347',
  appId: '1:970543987347:web:5d392fe7752c473186ab66',
  measurementId: "G-S1CGD29N5G"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

@Injectable({ providedIn: 'root' })
export class FirebaseService {
  async addJob(job: any) {
    const docRef = await addDoc(collection(db, 'jobs'), job);
    return docRef.id;
  }
  async getJobs() {
    const jobsCol = collection(db, 'jobs');
    
    const jobsSnapshot = await getDocs(jobsCol);
    const jobsList = jobsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log(jobsList);

    return jobsList;
  }

  async updateJob(id: string, job: any) {
    const jobDoc = doc(db, 'jobs', id);
    await updateDoc(jobDoc, job);
  }

  async deleteJob(id: string) {
    const jobDoc = doc(db, 'jobs', id);
    await deleteDoc(jobDoc);
  }
}
