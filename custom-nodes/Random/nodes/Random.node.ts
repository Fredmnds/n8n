import { INodeType, INodeTypeDescription, INodeExecutionData, IExecuteFunctions } from 'n8n-workflow';
import axios from 'axios';

export class Random implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'Random',
        name: 'random',
        icon: 'file:icon.svg',
        group: ['transform'],
        version: 1,
        description: 'Desafio onfly - gera número aleatório usando Random.org',
        defaults: {
            name: 'Gerador de número aleatório',
        },
        inputs: ['main'],
        outputs: ['main'],
        properties: [
            {
                displayName: 'Min',
                name: 'min',
                type: 'number',
                default: 1,
                description: 'Número mínimo para gerar',
                required: true,
            },
            {
                displayName: 'Max',
                name: 'max',
                type: 'number',
                default: 100,
                description: 'Número máximo para gerar',
                required: true,
            },
        ],
    };

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const items = this.getInputData();

        const returnData: INodeExecutionData[] = [];

        for (let i = 0; i < items.length; i++) {
            const min = this.getNodeParameter('min', i) as number;
            const max = this.getNodeParameter('max', i) as number;

            if (max < min || max === min) {
                throw new Error('O valor máximo deve ser maior ao mínimo');
            }

            const url = `https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`;
            const date = new Date();
            const formattedDate = date.toLocaleString('pt-BR', {
                timeZone: 'America/Sao_Paulo',
            });

            date.toLocaleDateString('pt-BR');
            const response = await axios.get(url, { responseType: 'text' });
            returnData.push({
                json: {
                    min,
                    max,
                    randomNumber: Number(response.data.trim()),
                    date: formattedDate
                }
            });
        }

        return this.prepareOutputData(returnData);
    }
}
