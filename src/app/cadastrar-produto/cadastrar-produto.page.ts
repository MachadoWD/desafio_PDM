import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonItem, IonLabel, IonInput } from '@ionic/angular/standalone';

@Component({
  selector: 'app-cadastrar-produto',
  templateUrl: './cadastrar-produto.page.html',
  styleUrls: ['./cadastrar-produto.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonItem, IonLabel, IonInput, CommonModule, FormsModule]
})
export class CadastrarProdutoPage implements OnInit {

  nomeProduto: string = '';
  precoProduto: number = 0;
  estoqueProduto: number = 0;

  cadastrarProduto() {
    const novoProduto = {
      id: Date.now(),
      nome: this.nomeProduto,
      preco: this.precoProduto,
      estoque: this.estoqueProduto
    };

    const produtosSalvos = localStorage.getItem('produtos');

    // transforma em array
    let listaProdutos = produtosSalvos ? JSON.parse(produtosSalvos) : [];

    // adiciona novo produto
    listaProdutos.push(novoProduto);

    // salva novamente
    localStorage.setItem(
      'produtos',
      JSON.stringify(listaProdutos)
    );

    this.nomeProduto = '';
    this.precoProduto = 0;
    this.estoqueProduto = 0;

    console.log('Produto cadastrado:', novoProduto); 
  }

  irParaMenu() {
    window.location.href = '/inicial';
  }

  constructor() { }

  ngOnInit() {

    
  }

}
