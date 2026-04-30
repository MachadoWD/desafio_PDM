import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonList, IonButton} from '@ionic/angular/standalone';


export type Tarefa = {
  id: number,
  titulo: string,
  concluida: boolean,
  prioridade: "baixa" | "media" | "alta",
  dataCriacao: Date
}

export type Produto = {
  id: number,
  nome: string,
  preco: number,
  estoque: number
}

@Component({
  selector: 'app-inicial',
  templateUrl: './inicial.page.html',
  styleUrls: ['./inicial.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, IonList, IonButton]
})
export class InicialPage implements OnInit {

    listaProdutos: Produto[] = [
      { id: 1, nome: "Notebook", preco: 3200, estoque: 3},
      { id: 2, nome: "Mouse", preco: 300, estoque: 7},
      { id: 3, nome: "Teclado", preco: 270, estoque: 4},
      { id: 4, nome: "Mouse Pad", preco: 72, estoque: 2},
      { id: 5, nome: "Headset", preco: 400, estoque: 5},
    ]

    listaTarefas: Tarefa[] = [
      { id: 1, titulo: "Fechar a loja", concluida: false, prioridade: "alta", dataCriacao: new Date},
      { id: 2, titulo: "Varrer a chão", concluida: true, prioridade: "media", dataCriacao: new Date},
      { id: 3, titulo: "Checar câmeras de segurança", concluida: false, prioridade: "alta", dataCriacao: new Date},
      { id: 4, titulo: "ligar televisões", concluida: true, prioridade: "baixa", dataCriacao: new Date},
      { id: 5, titulo: "Ser feliz", concluida: false, prioridade: "baixa", dataCriacao: new Date},
    ]

    formatarPreco(preco: number): string {
      let valorFormatado: string = preco.toFixed(2).replace(/\./g, ',');
      return "R$" + valorFormatado;
    }

    calcularValorEstoque(estoque: number, preco: number): string {
      let valorTotal: number = estoque * preco;
      let valorFormatado: string = valorTotal.toFixed(2).replace(/\./g, ',');
      return "R$" + valorFormatado;
    }


    filtrarTarefas(): string {
      let pendentes = "Pendentes: "
      let concluidas = "Concluidas: "


      this.listaTarefas.forEach(tarefa => {
        if (tarefa.concluida){
          (concluidas += "," + (tarefa.titulo) + " ")
        }
      })

      this.listaTarefas.forEach(tarefa => {
        if (!tarefa.concluida){
          (pendentes += "," + (tarefa.titulo) + " ")
        }
      })
      return (concluidas + "\n" + pendentes)

    }

  constructor() { }

  ngOnInit() {
  }

}
