
import {Router} from "express"

const router = new Router()

const champions = [
    {
        name: "Aatrox",
        role: "Top",
        description: "Aatrox is a champion that is very strong in the early game, but falls off in the late game. He is a great pick for players who like to play aggressively and snowball the game.",
        img: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg"
    },
    {
        name: "Ahri",
        role: "Mid",
        description: "Ahri is a champion that is very versatile and can be played in many different ways. She is a great pick for players who like to play safe and poke the enemy from a distance.",
        img: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ahri_0.jpg"
    },
    {
        name: "Xayah",
        role: "ADC",
        description: "Xayah is a champion that is very strong in the late game, but struggles in the early game. She is a great pick for players who like to play safe and farm up for the late game.",
        img: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Xayah_0.jpg"
    },
    {
        name: "Braum",
        role: "Support",
        description: "Braum is a champion that is very tanky and can protect his allies very well. He is a great pick for players who like to play defensively and protect their team.",
        img: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Braum_0.jpg"
    },
    {
        name: "Lee sin",
        role: "Jungle",
        description: "Lee sin is a champion that is very strong in the early game, but falls off in the late game. He is a great pick for players who like to play aggressively and snowball the game.",
        img: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/LeeSin_0.jpg"
    }
]


router.get("/", (req, res) => {
    res.render("champions", {champions})
})
router.get("/champion/:name", (req, res) => {
    const name = req.params.name
    const resolvedChampion = champions.find(champion => champion.name === name)
    if (!resolvedChampion) {
        return res.status(404).send("Champion not found")
    }
    res.render("champion", {champion: resolvedChampion})
})


export default router