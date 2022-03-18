import { Component, OnInit } from '@angular/core';

// Importando dependências
import { ActivatedRoute } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { doc, getDoc, getFirestore, onSnapshot, where } from 'firebase/firestore';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {

  // Armazena o Id do artigo vindo da rota
  public id: string;

  // Conexão com o Firebase
  app = initializeApp(environment.firebase);

  // Conexão com o banco de dados
  db = getFirestore();

  // Armazena o artigo completo
  art: any;

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  async ngOnInit() {

    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    await getDoc(doc(this.db, 'manual', this.id),  where('status', '==', 'on'), (myArt) => {

      // Armazena o artigo em 'art'
      this.art = myArt.data();

      console.log(this.art);
    });

  }

}



const docRef = doc(db, "cities", "SF");
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
} else {
  // doc.data() will be undefined in this case
  console.log("No such document!");
}



