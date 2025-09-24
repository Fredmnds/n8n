import axios from 'axios';
import { Random } from '../nodes/Random.node';
import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Random Node', () => {
    let node: Random;
    let executeFunctionsMock: Partial<IExecuteFunctions>;

    beforeEach(() => {
        node = new Random();

        executeFunctionsMock = {
            getInputData: jest.fn().mockReturnValue([{ json: {} }]),
            getNodeParameter: jest.fn(),
            prepareOutputData: async (data: INodeExecutionData[]) => [data],
        };
    });

    it('deve lançar erro se max < min', async () => {
        (executeFunctionsMock.getNodeParameter as jest.Mock)
            .mockImplementation((name: string) => {
                if (name === 'min') return 10;
                if (name === 'max') return 5;
            });

        await expect(
            node.execute.call(executeFunctionsMock as IExecuteFunctions)
        ).rejects.toThrow('O valor máximo deve ser maior ao mínimo');
    });

    it('deve lançar erro se max === min', async () => {
        (executeFunctionsMock.getNodeParameter as jest.Mock)
            .mockImplementation((name: string) => {
                if (name === 'min') return 5;
                if (name === 'max') return 5;
            });

        await expect(
            node.execute.call(executeFunctionsMock as IExecuteFunctions)
        ).rejects.toThrow('O valor máximo deve ser maior ao mínimo');
    });

    it('deve retornar número aleatório quando parâmetros válidos', async () => {
        (executeFunctionsMock.getNodeParameter as jest.Mock)
            .mockImplementation((name: string) => {
                if (name === 'min') return 1;
                if (name === 'max') return 10;
            });

        mockedAxios.get.mockResolvedValueOnce({ data: '7\n' });

        const result = await node.execute.call(executeFunctionsMock as IExecuteFunctions);

        expect(result[0][0].json).toHaveProperty('randomNumber', 7);
        expect(result[0][0].json.min).toBe(1);
        expect(result[0][0].json.max).toBe(10);
        expect(typeof result[0][0].json.date).toBe('string');
    });

    it('deve chamar random.org com URL correta', async () => {
        (executeFunctionsMock.getNodeParameter as jest.Mock)
            .mockImplementation((name: string) => {
                if (name === 'min') return 5;
                if (name === 'max') return 15;
            });

        mockedAxios.get.mockResolvedValueOnce({ data: '12\n' });

        await node.execute.call(executeFunctionsMock as IExecuteFunctions);

        expect(mockedAxios.get).toHaveBeenCalledWith(
            expect.stringContaining('min=5&max=15'),
            { responseType: 'text' }
        );
    });

});