
from rembg import remove
import time

with open("images/photo3.jpg", "rb") as f:
    image = f.read()

debut = time.perf_counter()

resultat = remove(image)

fin = time.perf_counter()

with open("resultats/photo3.png", "wb") as f:
    f.write(resultat)

print("Fond supprimé avec succès !")
print(f"Temps : {fin - debut:.2f} secondes")
