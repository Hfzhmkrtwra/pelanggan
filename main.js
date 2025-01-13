import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js'
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy
} from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js'


const firebaseConfig = {
  apiKey: "AIzaSyDGYnq4VKq-YGu4RbfoI_ZHez9fishYjZo",
  authDomain: "insan-cemerlang-afd2f.firebaseapp.com",
  projectId: "insan-cemerlang-afd2f",
  storageBucket: "insan-cemerlang-afd2f.appspot.com",
  messagingSenderId: "686649580589",
  appId: "1:686649580589:web:61374bbbd68adb604eaca4",
  measurementId: "G-LNZTQBCE26"
};

//inisialisasi firebase
const aplikasi = initializeApp(firebaseConfig)
const basisdata = getFirestore(aplikasi)


export async function ambilDaftarPelanggan() {
  const refDokumen = collection(basisdata, "pelanggan3");
  const kueri = query(refDokumen, orderBy("nama"));
  const cuplikanKueri = await getDocs(kueri);

  let hasilKueri = [];
  cuplikanKueri.forEach((dokumen) => {
    hasilKueri.push({
      id: dokumen.id,
      nama: dokumen.data().nama,
      alamat: dokumen.data().alamat,
      nohape: dokumen.data().nohape
    })
  })

  return hasilKueri;
}

//fungsi menambah data pelanggan 
export async function tambahPelanggan(nama, alamat, nohape) {
  try {
    // menyimpan data ke firebase
    const refDokumen = await addDoc(collection(basisdata, "pelanggan3"), {
      nama: nama,
      alamat: alamat,
      nohape: nohape
    })

    // menampilkan pesan berhasil
    console.log('berhasil menyimpan data pelanggan')
  } catch (error) {
    // menampilkan pesan gagal
    console.log('gagal menyimpan data pelanggan' + error)
  }
}

export async function hapusPelanggan(id) {
  await deleteDoc(doc(basisdata, "pelanggan3", id))
}

export async function ubahPelanggan(id, namabaru, alamatbaru, nohapebaru) {
  await updateDoc(
    doc(basisdata, "pelanggan3", id), { nama: namabaru, alamat: alamatbaru, nohape: nohapebaru }
  )
}

export async function ambilPelanggan(id) {
  const refDokumen = await doc(basisdata, "pelanggan3", id)
  const snapshotDokumen = await getDoc(refDokumen)

  return await snapshotDokumen.data()
}