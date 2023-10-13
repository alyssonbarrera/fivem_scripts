class AppError {
    constructor(message) {
        this.message = message
    }
}

const weapons = {
    adaga: 'weapon_dagger',
    taco: 'weapon_bat',
    garrafa: 'weapon_bottle',
    pe_de_cabra: 'weapon_crowbar',
    desarmado: 'weapon_unarmed',
    lanterna: 'weapon_flashlight',
    taco_de_golfe: 'weapon_golfclub',
    martelo: 'weapon_hammer',
    machadinha: 'weapon_hatchet',
    machadinha_de_pedra: 'weapon_stone_hatchet',
    soco_ingles: 'weapon_knuckle',
    faca: 'weapon_knife',
    facao: 'weapon_machete',
    canivete: 'weapon_switchblade',
    cassetete: 'weapon_nightstick',
    chave_de_grifo: 'weapon_wrench',
    machado_de_guerra: 'weapon_battleaxe',
    taco_de_bilhar: 'weapon_poolcue',
    bengala_doce: 'weapon_candycane',
    pistola: 'weapon_pistol',
    pistola2: 'weapon_pistol',
    pistola3: 'weapon_combatpistol',
    pistola4: 'weapon_appistol',
    pistola5: 'weapon_pistol50',
    pistola6: 'weapon_pistol50',
    pistola7: 'weapon_snspistol_mk2',
    pistola8: 'weapon_heavypistol',
    pistola9: 'weapon_vintagepistol',
    pistola10: 'weapon_marksmanpistol',
    pistola11: 'weapon_raypistol',
    pistola12: 'weapon_pistolxm3',
    pistola13: 'weapon_machinepistol',
    pistola14: 'weapon_tecpistol',
    pistola15: 'weapon_flaregun',
    pistola_perico: 'weapon_ceramicpistol',
    taser: 'weapon_stungun',
    taser2: 'weapon_stungun_mp',
    revolver: 'weapon_revolver',
    revolver2: 'weapon_revolver_mk2',
    revolver3: 'weapon_doubleaction',
    revolver4: 'weapon_navyrevolver',
    smg: 'weapon_microsmg',
    smg2: 'weapon_smg',
    smg3: 'weapon_smg_mk2',
    smg4: 'weapon_assaultsmg',
    smg5: 'weapon_combatpdw',
    smg6: 'weapon_minismg',
    doze: 'weapon_pumpshotgun',
    doze2: 'weapon_pumpshotgun_mk2',
    doze3: 'weapon_sawnoffshotgun',
    doze4: 'weapon_assaultshotgun',
    doze5: 'weapon_bullpupshotgun',
    doze6: 'weapon_musket',
    doze7: 'weapon_heavyshotgun',
    doze8: 'weapon_dbshotgun',
    doze9: 'weapon_autoshotgun',
    doze10: 'weapon_combatshotgun',
    fuzil: 'weapon_assaultrifle',
    fuzil2: 'weapon_assaultrifle_mk2',
    fuzil3: 'weapon_advancedrifle',
    carabina: 'weapon_carbinerifle',
    carabina2: 'weapon_carbinerifle_mk2',
    carabina3: 'weapon_specialcarbine',
    carabina4: 'weapon_specialcarbine_mk2',
    rifle: 'weapon_bullpuprifle',
    rifle2: 'weapon_bullpuprifle_mk2',
    rifle3: 'weapon_compactrifle',
    rifle4: 'weapon_militaryrifle',
    rifle5: 'weapon_heavyrifle',
    rifle6: 'weapon_tacticalrifle',
    metralhadora: 'weapon_mg',
    metralhadora2: 'weapon_combatmg',
    metralhadora3: 'weapon_combatmg_mk2',
    metralhadora4: 'weapon_gusenberg',
    sniper: 'weapon_sniperrifle',
    sniper2: 'weapon_heavysniper',
    sniper3: 'weapon_heavysniper_mk2',
    sniper4: 'weapon_marksmanrifle',
    sniper5: 'weapon_marksmanrifle_mk2',
    sniper6: 'weapon_precisionrifle',
    mosquete: 'weapon_musket',
    minigun: 'weapon_minigun',
    minigun2: 'weapon_rayminigun',
    rpg: 'weapon_rpg',
    rpg2: 'weapon_hominglauncher',
    shumikha: 'weapon_grenadelauncher',
    shumikha2: 'weapon_grenadelauncher_smoke',
    mini_shumikha: 'weapon_compactlauncher',
    fogos_artificio: 'weapon_firework',
    canhao_eletrico: 'weapon_railgun',
    canhao_eletrico2: 'weapon_railgunxm3',
    mini_emp: 'weapon_emplauncher',
    granada: 'weapon_grenade',
    gaz_cs: 'weapon_bzgas',
    molotov: 'weapon_molotov',
    bomba_adesiva: 'weapon_stickybomb',
    mina_proximidade: 'weapon_proxmine',
    bola_neve: 'weapon_snowball',
    bomba_caseira: 'weapon_pipebomb',
    bola: 'weapon_ball',
    granada_fumaca: 'weapon_smokegrenade',
    sinalizador: 'weapon_flare',
    gasolina: 'weapon_petrolcan',
    paraquedas: 'gadget_parachute',
    extintor: 'weapon_fireextinguisher',
    lata_perigosa: 'weapon_hazardcan',
    fertilizante: 'weapon_fertilizercan',
    pacote_acido: 'weapon_acidpackage',
}