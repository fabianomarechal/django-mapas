from selenium import webdriver
import unittest

class NewVisitorTest(unittest.TestCase):
    def setUp(self):
        self.browser = webdriver.Firefox()

    def tearDown(self):
        self.browser.quit()

    def test_can_start_a_list_and_retrieve_it_later(self):
        # Carlos ouviu falar de uma nova aplicação online interessante para
        # lista de Mapas. ELe decide verificar sua homepage
        self.browser.get('http://localhost:3000')

        # Ele percebe que o título da página e o cabeçalho mencionam listas de
        # mapas
        self.assertIn('Mapas', self.browser.title)

        # Ele é convidado a inserir um item de Mapa imediatamente.

        # Ele digita "Alagoas" em uma caixa de texto, insere as coordenadas
        # latitude e longitude, e desenha um polígono

        # Ao clicar em salvar, ele é redirecionado para a página inicial onde o item
        # adicionado aparece na lista de mapas

        # Carlos se pergunta se o site lembrará de sua lista. Ele então nota que o
        # site gerou um URL único para ele -- há um pequeno texto explicativo para isso.

        # Ele acessa essa URL - seus itens de Mapa continuam lá

        # Satisfeito, ele volta a dormir.

if __name__ == '__main__':
    unittest.main(warnings='ignore')