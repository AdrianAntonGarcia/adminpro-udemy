import { Component, OnInit, Input } from '@angular/core';
import { MultiDataSet, Label } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {

  // @Input()
  @Input() doughnutChartLabels: Label[];
  // public doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];

  @Input('datos') doughnutChartData: MultiDataSet[];
  // public doughnutChartData: MultiDataSet = [
  //   [350, 450, 100]
  // ];
  @Input() doughnutChartType: ChartType;
  // public doughnutChartType: ChartType = 'doughnut';
  @Input() leyenda: string;



  constructor() { }

  ngOnInit() {
    console.log('doughnutChartLabels', this.doughnutChartLabels);
  }

}
