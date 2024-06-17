---
name: Coding
tools: [C#, Html, Markdown]
image: https://raw.githubusercontent.com/Seerow0/-MK-II-Nicholas-J-Website-/main/gifs/code-frustration(2).gif
description: Unity Coding Scripts
---

* TOC
{:toc}

# Music Slider
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI; 


public class ChangeMusicVolume : MonoBehaviour {



	public Slider Volume;
	public AudioSource myMusic;
	
	// Update is called once per frame
	void Update () {
		myMusic.volume = Volume.value;
	}
}

---------------------------------------

# Time Destroy

using UnityEngine;
using System.Collections;

public class DestroyByTime : MonoBehaviour
{
    public float lifetime;

    void Start()
    {
        Destroy(gameObject, lifetime);
    }
} 

------------------

# On Trigger

using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class OnTrigger : MonoBehaviour {


	public KeyCode MyKey;
	public string MyTrigger;

	void Update ()
	{
		if (Input.GetKey (MyKey)) {
			GetComponent<Animator> ().SetTrigger (MyTrigger);
		}
	}
}

---------------------------

# Pause Menu

using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class PauseMenu : MonoBehaviour {

	public static bool gameispaused = false;

	public GameObject pauseMenuUI;
	// Update is called once per frame
	void Update () {

		if (Input.GetKeyDown(KeyCode.Escape))
			
		{
	if (gameispaused)
				
	{
		Resume();

	} else 
	{
		Pause();
}
			//Screen.lockCursor = false;
			//Screen.lockCursor = true;
}

}
public void Resume()
{
	pauseMenuUI.SetActive(false);
	Time.timeScale = 1f;
	gameispaused = false;
	Screen.lockCursor = true;
}
void Pause ()

{
	pauseMenuUI.SetActive(true);
	Time.timeScale = 0f;
	gameispaused = true; 
	Screen.lockCursor = false;
	
}
	public void LoadMenu()
	{
		Time.timeScale = 1f; 
		SceneManager.LoadScene ("Menu");
	}
	public void QuitGame()
	{
		Debug.Log("Quitting game...");
		Application.Quit ();
	}
}

--------------------

# PlaySoundOnPress

using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlaySoundOnPress : MonoBehaviour
{
    public AudioSource someSound;
    // Use this for initialization
    void Start()
    {

    }

    // Update is called once per frame
    void Update()
    {
        if (Input.GetKeyDown(KeyCode.U))
        {
            someSound.Play();
        }
    }
}

# Roll Anim

using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Roll : MonoBehaviour {
//	public Animator anim;
//	// Use this for initialization
//	void Start () {
//		anim = GetComponent<Animator> ();
//	}
//	
//	// Update is called once per frame
//	void Update () {
//		if (Input.GetKeyDown ("1"));
//		{
//			anim.Play ("roll");
//		}
//	}
//}
	public bool roll;


	void Start()
	{
		roll = false;
	}

	void Update()
	{
		if (Input.GetButton("1"))
		{
			roll = true;
		}
		else
		{
			roll = false;
		}
	}
}

----------------

# Splash Sequence

using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class SplashSequence : MonoBehaviour {

	public static int SceneNumber;
	// Use this for initialization
	void Start () {
		if (SceneNumber == 0) {
			StartCoroutine (ToSplashTwo());
	}
		if (SceneNumber == 1) {
			StartCoroutine (ToMainMenu ());
		}

	}
	IEnumerator ToSplashTwo () {
		yield return new WaitForSeconds (5);
		SceneNumber = 1;
		SceneManager.LoadScene (1);
	}
	IEnumerator ToMainMenu () {
		yield return new WaitForSeconds (5);
		SceneNumber = 2;
			SceneManager.LoadScene (2);
}
}

-----
 # Death Trigger

 

  using UnityEngine;
using System.Collections;

public class deathtrigger : MonoBehaviour


{

    public bool death;
    private GameObject player;
    private Animator anim;
    private AudioClip sound;

    // Use this for initialization
    void Start()
    {
    }

    // Update is called once per frame
    void Update()
    {
        anim = GetComponent<Animator>();
    }

    void OnTriggerEnter(Collider other)
    {
        anim.SetBool("death", true);
        GetComponent<AudioSource>().Play();
    }

    void OnTriggerExit(Collider other)
    {
        anim.SetBool("death", false);
    }
}

--------------

# Detect Hit

using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
public class detecthit : MonoBehaviour {
    // public SimpleHealthBar healthBar;
    public Slider healthbar;
   Animator anim;


    void OnTriggerEnter(Collider other)
    {
        //Debug.Log("Hit");
        //healthBar.UpdateBar(90,100);//100-90 is 10 damage//90,100//
        //if (healthBar.UpdateBar(90,100)) ;
        healthbar.value -= 2;
        if(healthbar.value <=0)
        anim.SetBool("death", true);
      // healthbar.value -= 20;

       
    }

    void Start()
    {
        anim = GetComponent<Animator>();
    }
    void Update()
    {

    }
}

----------

# Don't Destroy

using System.Collections;

using UnityEngine;

public class dontdestroy : MonoBehaviour {

    void Awake()
    {
        GameObject[] objs = GameObject.FindGameObjectsWithTag("music");
        if (objs.Length > 1)
            Destroy(this.gameObject);
            DontDestroyOnLoad(this.gameObject);

    }
}
------
# Main Menu

using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class mainmenu : MonoBehaviour {

	public void PlayGame ()
	{ 
SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex + 1);
}



	public void QuitGame ()
	{
		Debug.Log ("QuitGame!");
		Application.Quit ();
	}

}

------

# Reload-On-Death-Collider

using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class reloaddie : MonoBehaviour
{




    void OnCollisionEnter(Collision collision)
    {
        if (collision.gameObject.tag == "spikes")
        {
            SceneManager.LoadScene("Official2");
            //Or:
            //SceneManager.LoadScene (SceneIndex); //(without these: ", because it's a number - an int, not a string)
        }
    }
}

-----
# Reload_Alt
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class reloaddie1 : MonoBehaviour
{




    void OnCollisionEnter(Collision collision)
    {
        if (collision.gameObject.tag == "final")
        {
            SceneManager.LoadScene("FinalScene");
            //Or:
            //SceneManager.LoadScene (SceneIndex); //(without these: ", because it's a number - an int, not a string)
        }
    }
}

------

# Respawn

using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class respawn : MonoBehaviour {


		[SerializeField]private Transform player;
		[SerializeField]private Transform respawnPoint;

		void OnTriggerEnter(Collider other)
	{
		

			player.transform.position = respawnPoint.transform.position;
		}
	}

 -----
 
 # Test Despawn/ Reload

 using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class tst : MonoBehaviour
{
    public Animator anim;
    private void OnTriggerStay(Collider other)
    {
        if (other.gameObject.tag == "Player")
            anim.SetBool("death", true);
    }
}
<p class="text-center">
{% include elements/button.html link="https://nicholasjonathan.com/projects/" text="Previous Page" %}
