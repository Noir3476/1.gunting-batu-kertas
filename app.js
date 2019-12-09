const game = ()=>{
    let p_score = 0;
    let c_score = 0;
    const final_score = 10;

    //Memulai pepindahan tampilan awal ke tampilan permainan
    const start = ()=>{
        const mulai = document.querySelector('.intro button');
        const intro = document.querySelector('.intro');
        const match = document.querySelector('.match');

        //Saat di klick maka akan berpindah halaman
        mulai.addEventListener('click', ()=>{
            intro.classList.add('fadeOut');
            match.classList.add('fadeIn');
        });
    };

    //Memulai permainan
    const play = ()=>{
        
        const option = document.querySelectorAll('.option button');
        const p_hand = document.querySelector('.player-hand');
        const c_hand = document.querySelector('.computer-hand');
        const hands = document.querySelectorAll('.hand img');

        //Setiap animasi tangan sudah dilakukan animasi akan dihentikan
        hands.forEach(hand =>{
            hand.addEventListener('animationend', function() {
                this.style.animation = '';
            });
        })

        //Pilihan untuk computer
        const c_option = ['batu', 'kertas', 'gunting'];
        
        //Saat pemain memilih salah satu pilihan
        option.forEach(option=>{
            option.addEventListener('click', function() {
                
                //Menciptakan angka acak sebagai pilihan komputer
                const random_gen = Math.floor(Math.random() * 3);
                //Mencocokan index array dengan angka yang diperoleh dari random_gen
                const c_choice = c_option[random_gen];
                
                //Menentukan waktu (susah menjelaskan nya coba aja 560 diganti menjadi 50)
                setTimeout(() => {
                    //Membandingkan pilihan komputer dengan pemain
                    compare_hand(this.textContent, c_choice);

                    //Meng-update skor yang didapat setelah membandingkan
                    update_score();

                    //Mengakhiri game apabila telah mencapai syarat tertentu
                    end_game();

                    //Mengubah gambar tangan sesuai dengan pilihan 
                    p_hand.src = `./assets/${this.textContent}.png`;
                    c_hand.src = `./assets/${c_choice}.png`;
                }, 560);

                //Menambahkan animation di class player dan komputer hand
                p_hand.style.animation = "shakePlayer 0.5s ease";
                c_hand.style.animation = "shakeComputer 0.5s ease";
            });
        });
    };

    //Membandingkan tangan pemain dan komputer
    const compare_hand = (p_choice, c_choice)=>{
        const winner = document.querySelector('.win');
        
        //Perbandingan yang dilakukan ubntuk menentukan pemenang nya
        if(p_choice === c_choice){
            winner.textContent = 'Draw';            
            return;
        }
        if(p_choice === 'batu'){
            if(c_choice === 'gunting'){
                winner.textContent = 'Player Win';
                p_score++;
                return;
            }else{
                winner.textContent = 'Computer Win';
                c_score++;
                return;
            }
        }
        if(p_choice === 'kertas'){
            if(c_choice === 'gunting'){
                winner.textContent = 'Computer Win';
                c_score++;
                return;
            }else{
                winner.textContent = 'Player Win';
                p_score++;
                return;
            }
        }
        if(p_choice === 'gunting'){
            if(c_choice === 'batu'){
                winner.textContent = 'Computer Win';
                c_score++;
                return;
            }else{
                winner.textContent = 'Player Win';
                p_score++;
                return;
            }
        }
    };

    //Meng-update score 
    const update_score = ()=>{
        const player_score = document.querySelector(".player-score p");
        const computer_score = document.querySelector(".computer-score p");

        //Mengubah isi dari player dan computer score sesuai dengan scor yang telah didapatkan
        player_score.textContent = p_score;
        computer_score.textContent = c_score;
    };

    //Mengakhiri permainan
    const end_game = ()=>{
        const player_score = p_score;
        const computer_score = c_score;

        const winner = document.querySelector('.win');
        const option = document.querySelector('.option');

        //Jika skor telah mencapai final_score yaitu 10
        if (computer_score === final_score || player_score === final_score) {
            //Text akan berganti menjadi Game Over
            winner.textContent = 'Game Over';

            //Tombol tidak akan bisa dipencet
            option.classList.add('btn-disabled');

            //Setelah 250ms maka halaman akan di reload dan permainan diulang dari awal
            setTimeout(() => {
                location.reload(true);
            }, 2500);
        }
    };
    
    //Mengaktifkan fungsi start
    start();
    //Mengaktifkan fungsi play
    play();
};

//Memulai Permainan
game();
