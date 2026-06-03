import tkinter as tk

# Função executada quando o botão é clicado
def clique_botao():
    # Atualiza o texto do rótulo
    rotulo.config(text="Olá! Você clicou no botão!")

# 1. Cria a janela principal
janela = tk.Tk()
janela.title("Meu Primeiro App Tkinter")
janela.geometry("300x200") # Define a largura e altura da janela

# 2. Cria um widget de Rótulo (Label)
rotulo = tk.Label(janela, text="Bem-vindo ao Tkinter!", font=("Arial", 14))
rotulo.pack(pady=20) # .pack() organiza o widget na janela com espaçamento vertical

# 3. Cria um widget de Botão (Button)
botao = tk.Button(janela, text="Clique Aqui", command=clique_botao, font=("Arial", 12))
botao.pack(pady=10)

# 4. Inicia o loop principal para manter a janela aberta
janela.mainloop()
