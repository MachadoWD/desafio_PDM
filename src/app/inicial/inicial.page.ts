import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonList, IonButton, IonLabel} from '@ionic/angular/standalone';
import { App } from '@capacitor/app';

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
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, IonList, IonButton, IonLabel]
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

  // Variáveis de controle

  apresentarValorEstoque: boolean = false;
  apresentarProdutos: boolean = false;
  apresentarTarefas: boolean = false;
  ordernar: boolean = false;
  filtro: boolean = false;
  tarefasFiltradas: Tarefa[] = [];

  // Formatar Gerais

  formatarPreco(preco: number): string {
    let valorFormatado: string = preco.toFixed(2).replace(/\./g, ',');
    return "R$" + valorFormatado;
  }

  // Funções dos Produtos

  listarProdutos() {
    this.apresentarProdutos = true;
    return true;
  }

  calcularTotalEstoque() {
    
    let valorEstoque: number = 0;

    for (let i = 0; i < this.listaProdutos.length; i++) {
      
      valorEstoque += this.listaProdutos[i].preco * this.listaProdutos[i].estoque;
    }

    return this.formatarPreco(valorEstoque);
  }

  // Funções das Tarefas

  listarTarefas() {
    this.apresentarTarefas = true;
    return true;
  }

  filtrarTarefas(concluida: boolean){
    this.tarefasFiltradas = this.listaTarefas.filter(
      tarefa => tarefa.concluida === concluida
    );

    this.filtro = true;
  }

  ordenarPorPrioridade(){

    const ordemPrioridade = {
        alta: 1,
        media: 2,
        baixa: 3
      };

      this.listaTarefas.sort((a, b) => {
        return ordemPrioridade[a.prioridade] - ordemPrioridade[b.prioridade];
      });

    this.ordernar = true;
  } 

  concluirTarefa(tarefa: Tarefa) {
    tarefa.concluida = !tarefa.concluida
  }

  // Navegação

  irCadastrarProduto() {
    window.location.href = '/cadastrar-produto';
  }
  sair() {
    window.location.href = '/home';
  }

  constructor() { }

  ngOnInit() {

    const produtosSalvos =
    localStorage.getItem('produtos');

    if (produtosSalvos) {

      const novosProdutos =
        JSON.parse(produtosSalvos);

      this.listaProdutos = [
        ...this.listaProdutos,
        ...novosProdutos
      ];

    }
  }
}
