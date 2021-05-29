import { Transferencia } from './../models/transferencia.model';
import { TransferenciaService } from './../services/transferencia.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nova-tranferencia',
  templateUrl: './nova-transferencia.component.html',
  styleUrls: ['./nova-transferencia.component.scss'],
})
export class NovaTransferenciaComponent implements OnInit {
  @Output() aoTranferir = new EventEmitter<any>();

  valor: number;
  destino: number;

  constructor(private service: TransferenciaService, private router: Router) {}

  ngOnInit(): void {}

  transferir() {
    if (this.ehValido()) {
      // this.aoTranferir.emit({ valor: this.valor, destino: this.destino });
      const valorEmitir: Transferencia = {
        valor: this.valor,
        destino: this.destino,
      };
      this.service.adicionar(valorEmitir).subscribe(
        (resultado) => {
          console.log(resultado);
          this.limparCampo();
          this.router.navigateByUrl('extrato');
        },
        (error) => console.log(error)
      );
    }
  }

  limparCampo() {
    this.valor = 0;
    this.destino = 0;
  }

  ehValido() {
    const valido = this.valor > 0;
    if (!valido) {
      alert('Valor inválido, por favor, preencha novamente...');
    }
    return valido;
  }

  modalMsgErro(mensagem) {
    alert(mensagem);
  }
}
