import NoData from '../NoData'
import { mount } from '@vue/test-utils'

describe('NoData', () => {

    it('text', () => {
        const wrapper = mount(NoData, {
            propsData: {
                text: '好烦aaaaa'
            }
        });

        expect(wrapper.find('.no-data-text').text()).toBe('好烦aaaaa');
    });

    it('will fail every time', () => {
        const user = {
            createdAt: new Date(),
            id: Math.floor(Math.random() * 20),
            name: 'LeBron James',
        };

        expect(user).toMatchSnapshot({
            createdAt: expect.any(Date),
            id: expect.any(Number),
        });
    });
})